const fs = require("fs/promises");
const path = require("path");
const dayjs = require("dayjs");
const replaceExt = require("replace-ext");
const { MDBuilder } = require("./MDBuilder");
const { MDNotValidData } = require("./MDExceptions");

/**
 * MDPoster - It is generate posts data and metadatas from markdown documents.
 * @class
 */
class MDPoster
{
    static BUILD_DIR_NAME = ".build";
    static POST_BUILD_DIR_NAME = "build_posts";
    static POSTS_METADATA_FILE = "post.json";
    static SERIES_METADATA_FILE = "series.json";
    static TAGS_METADATA_FILE = "tags.json";
    
    /**
     * @param {String} savedDirectory - save directory with markdown documents. 
     */
    constructor(savedDirectory)
    {
        this.mdBuilder = new MDBuilder();
        this.savedDir = savedDirectory;
        this.buildDir = "";

        // If savedDirectory is empty, set current directory
        if (!this.savedDir)
        {
            this.savedDir = __dirname;
        }

        this.buildDir = path.resolve(this.savedDir, MDPoster.BUILD_DIR_NAME);
        this.buildPostsDir = path.resolve(this.buildDir, MDPoster.POST_BUILD_DIR_NAME);

        this.postsMeta = [];
        this.seriesMeta = {};
        this.tagsMeta = {};
    }

    /**
     * Generate post and metadata from markdown saved directory
     * @public
     * @param {Boolean} refresh - Ignore exists meta files and generate all files refresh.
     */
    async Posterization(refresh = false)
    {
        await this.CheckDirectories();

        if (!refresh)
        {
            await this.ReadMetadatas();
        }

        const changedMDList = await this.ReadChangedMDList(this.postsMeta);

        console.log("Find changed markdown list : ", changedMDList);

        for (const [index, markdownFile] of changedMDList.entries())
        {
            if (markdownFile.deleted)
            {
                await this.DeletePostsMetadata(markdownFile.postUid);
            }
            else
            {
                const rawMarkdown = await fs.readFile(path.resolve(this.savedDir, markdownFile.name), {
                    encoding : "utf8"
                });
    
                const mdPostData = this.mdBuilder.Parse(rawMarkdown);

                if (markdownFile.exists)
                {
                    await this.ModifyPostsMetadata(markdownFile.mtime, markdownFile.postUid, mdPostData);
                }
                else
                {
                    await this.AppendPostsMetadata(markdownFile.name, mdPostData);
                }
            }
        }

        const timeSortFunc = (a, b) => {
            const dateA = dayjs(a.date);
            const dateB = dayjs(b.date);

            if (dateA.isSame(dateB))
            {
                return 0;
            }

            if (dateA.isAfter(dateB))
            {
                return 1;
            }
            else
            {
                return -1;
            }
        };

        this.postsMeta.sort(timeSortFunc);

        for (const key in this.seriesMeta)
        {
            const seriesPostIds = this.seriesMeta[key].posts;
            const seriesPosts = [];

            this.postsMeta.forEach((element) => {
                if (seriesPostIds.includes(element.uid))
                {
                    seriesPosts.push(element);
                }
            });

            seriesPosts.sort(timeSortFunc);
            this.seriesMeta[key].posts = seriesPosts.map(e => e.uid);
        }

        await this.WriteMetadatas();
    }

    /**
     * Checking directories are valid and create build directory
     * @private
     * @throws
     */
    async CheckDirectories()
    {
        try 
        {
            const savedDirStat = await fs.stat(this.savedDir);

            if (!savedDirStat.isDirectory())
            {
                throw new MDNotValidData("given saved directory not valid!");
            }
        } 
        catch (error) 
        {
            console.log(error);
            
            throw error;
        }

        try 
        {
            const buildDirStat = await fs.stat(this.buildDir);
            if (!buildDirStat.isDirectory())
            {
                throw new MDNotValidData("build directory path already exists but not directory file!");
            }
        } 
        catch (error) 
        {
            if (error instanceof MDNotValidData)
            {
                console.log(error);

                throw error;
            }

            await fs.mkdir(this.buildDir, {
                recursive : true,
            });
        }

        try 
        {
            const stat = await fs.stat(this.buildPostsDir);
            if (!stat.isDirectory())
            {
                throw new MDNotValidData("build posts directory path already exists but not directory file!");
            }
        } 
        catch (error) 
        {
            if (error instanceof MDNotValidData)
            {
                console.log(error);

                throw error;
            }

            await fs.mkdir(this.buildPostsDir, {
                recursive : true,
            });
        }
    }

    /**
     * Read saved directory and get changed and new markdown file list.
     * @private
     */
    async ReadChangedMDList()
    {
        const fileList = await fs.readdir(this.savedDir, {
            encoding : "utf8",
            withFileTypes : true
        });

        const mdFormatExt = [
            ".md",
            ".MD",
            ".markdown",
        ];

        const markdownFileList = [];

        // Find new or changed files
        for (const file of fileList)
        {
            if (!file.isFile()) continue;

            const ext = path.extname(file.name);
            if (!mdFormatExt.includes(ext)) continue;

            const postMeta = this.postsMeta.find(meta => meta.originFile === file.name);

            if (postMeta)
            {
                const fileStat = await fs.stat(path.resolve(this.savedDir, file.name));

                if (postMeta.mtime !== fileStat.mtimeMs)
                {
                    markdownFileList.push({
                        name : file.name,
                        exists : true,
                        postUid : postMeta.uid,
                        mtime : fileStat.mtimeMs
                    });
                }
            }
            else
            {
                markdownFileList.push({
                    name : file.name,
                    exists : false,
                });
            }
        }

        // Find deleted files
        const deletedPostMetas = this.postsMeta.filter((e) => {
            return !fileList.some(f => f.name === e.originFile);
        });

        deletedPostMetas.forEach((meta) => {
            markdownFileList.push({
                exists : false,
                deleted : true,
                postUid : meta.uid,
            });
        });

        return markdownFileList;
    }

    async ReadMetadatas()
    {
        try 
        {
            const rawPostMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.POSTS_METADATA_FILE), {
                "encoding" : "utf8"
            });

            this.postsMeta = JSON.parse(rawPostMeta);
        } 
        catch (error) 
        {
            this.postsMeta = [];
        }

        try 
        {
            const rawSeriesMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.SERIES_METADATA_FILE), {
                "encoding" : "utf8"
            });

            this.seriesMeta = JSON.parse(rawSeriesMeta);
        } 
        catch (error) 
        {
            this.seriesMeta = {};
        }

        try 
        {
            const rawTagsMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.TAGS_METADATA_FILE), {
                "encoding" : "utf8"
            });

            this.tagsMeta = JSON.parse(rawTagsMeta);
        } 
        catch (error) 
        {
            this.tagsMeta = {};
        }
    }

    async WriteMetadatas()
    {
        // Write posts meta to disk
        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.POSTS_METADATA_FILE),
            JSON.stringify(this.postsMeta),
            {
                "encoding" : "utf8"
            });

        // Write series meta to disk
        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.SERIES_METADATA_FILE), 
            JSON.stringify(this.seriesMeta),
            {
                "encoding" : "utf8"
            });

        // Write tags meta to disk
        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.TAGS_METADATA_FILE), 
            JSON.stringify(this.tagsMeta),
            {
                "encoding" : "utf8"
            });
    }

    /**
     * Append post data to meta objects and write rendered html file to disk
     * @private
     * @param {String} originFile
     * @param {MDPostData} mdPostData 
     */
    async AppendPostsMetadata(originFile, mdPostData)
    {
        const newPostId = this.GetLastPostId(this.postsMeta) + 1;
        const htmlFileName = replaceExt(originFile, ".html"); 
        const htmlFilePathAbs = path.resolve(
                            this.buildDir, 
                            MDPoster.POST_BUILD_DIR_NAME,
                            htmlFileName
                        );

        let seriesId = null;
        let tagIds = [];

        if (mdPostData.seriesName)
        {
            seriesId = this.GetSeriesId(mdPostData.seriesName);

            this.seriesMeta[seriesId.toString()].posts.push(newPostId);
        }

        tagIds = mdPostData.tags.map((tag) => {
            const tagId = this.GetTagId(tag);

            this.tagsMeta[tagId.toString()].posts.push(newPostId);

            return tagId;
        });

        const fileStat = await fs.stat(path.resolve(this.savedDir, originFile));

        // Save Content
        await fs.writeFile(
            htmlFilePathAbs,
            mdPostData.content, 
            {
                "encoding" : "utf8",
            }
        );

        // Set post metadata
        this.postsMeta.push({
            uid : newPostId,
            title : mdPostData.title,
            summary : mdPostData.summary,
            thumbnail : mdPostData.thumbnail,
            date : mdPostData.date,
            lastEditDate: mdPostData.lastEditDate,
            series : seriesId,
            tags : tagIds,
            originFile : originFile,
            htmlFileName : htmlFileName,
            htmlFilePath : htmlFilePathAbs,
            mtime : fileStat.mtimeMs,
        });
    }

    /**
     * Modify metadatas for exists meta files
     * @param {Number} mtime
     * @param {Number} postUid
     * @param {MDPostData} mdPostData 
     * @throws
     */
    async ModifyPostsMetadata(mtime, postUid, mdPostData)
    {
        const curPostMeta = this.postsMeta.find(meta => meta.uid === postUid);

        if (!curPostMeta)
        {
            throw new MDNotValidData("Faild to find post meta");
        }


        // Change to series field
        let nowSeriesId = this.GetSeriesId(mdPostData.seriesName);

        if (nowSeriesId !== curPostMeta.series)
        {
            if (curPostMeta.series)
            {
                // remove post id from previous series meta
                const seriesPosts = this.seriesMeta[curPostMeta.series.toString()].posts;

                const removeIndex = seriesPosts.findIndex(post => post === curPostMeta.uid);
                seriesPosts.splice(removeIndex, 1);

                this.seriesMeta[curPostMeta.series.toString()].posts = seriesPosts;
            }

            // append post id to new series meta
            if (nowSeriesId)
            {
                this.seriesMeta[nowSeriesId.toString()].posts.push(curPostMeta.uid);
            }
            
            curPostMeta.series = nowSeriesId;
        }

        // Change tags field
        const nowTagIds = mdPostData.tags.map((tag) => {
            const tagId = this.GetTagId(tag);

            return tagId;
        });

        const deletedTags = curPostMeta.tags.filter(e => !nowTagIds.includes(e));
        for (const deletedTagId of deletedTags)
        {
            const tagPosts = this.tagsMeta[deletedTagId.toString()].posts;

            const removeIndex = tagPosts.findIndex(post => post === curPostMeta.uid);
            tagPosts.splice(removeIndex, 1);

            this.tagsMeta[deletedTagId.toString()].posts = tagPosts;
        }

        const addedTags = nowTagIds.filter(e => !curPostMeta.tags.includes(e));
        for (const addedTagId of addedTags)
        {
            this.tagsMeta[addedTagId.toString()].posts.push(curPostMeta.uid);
        }

        curPostMeta.tags = nowTagIds;

        // Flat the series meta, tags meta, If needed.

        // Modify post content
        await fs.writeFile(
            curPostMeta.htmlFilePath,
            mdPostData.content, 
            {
                "encoding" : "utf8",
            }
        );

        // Modify post metadata
        curPostMeta.title = mdPostData.title;
        curPostMeta.summary = mdPostData.summary;
        curPostMeta.thumbnail = mdPostData.thumbnail;
        curPostMeta.date = mdPostData.date;
        curPostMeta.lastEditDate = mdPostData.lastEditDate,
        curPostMeta.mtime = mtime;
    }

    async DeletePostsMetadata(postUid)
    {
        const curPostMetaIndex = this.postsMeta.findIndex(meta => meta.uid === postUid);
        const curPostMeta = this.postsMeta[curPostMetaIndex];

        await fs.unlink(curPostMeta.htmlFilePath);
        
        // Remove series
        if (curPostMeta.series)
        {
            const seriesPosts = this.seriesMeta[curPostMeta.series.toString()].posts;

            const removeIndex = seriesPosts.findIndex(post => post === curPostMeta.uid);
            seriesPosts.splice(removeIndex, 1);

            this.seriesMeta[curPostMeta.series.toString()].posts = seriesPosts;
        }

        // Remove tags
        for (const deletedTagId of curPostMeta.tags)
        {
            const tagPosts = this.tagsMeta[deletedTagId.toString()].posts;

            const removeIndex = tagPosts.findIndex(post => post === curPostMeta.uid);
            tagPosts.splice(removeIndex, 1);

            this.tagsMeta[deletedTagId.toString()].posts = tagPosts;
        }

        this.postsMeta.splice(curPostMetaIndex, 1);
    }

    /**
     * Get last post id from posts metadata
     * @private
     * @returns {Number}
     */
    GetLastPostId()
    {
        let lastId = -1;

        for (const meta of this.postsMeta) 
        {
            lastId = Math.max(meta.uid, lastId);
        }

        if (lastId === -1)
        {
            lastId = 0;
        }

        return lastId;
    }

    /**
     * Get series id from seriesName. 
     * @private
     * @param {String} seriesName 
     * @param {Boolean} append - If true, append new series.
     * @returns {Number | null}
     */
    GetSeriesId(seriesName, append = true)
    {
        if (!seriesName)
        {
            return null;
        }

        let lastSeriesId = -1;
        
        for (const key in this.seriesMeta)
        {
            lastSeriesId = Math.max(parseInt(key), lastSeriesId);

            if (this.seriesMeta[key].name === seriesName)
            {
                return parseInt(key);
            }
        }

        if (append)
        {
            if (lastSeriesId === -1)
            {
                lastSeriesId = 0;
            }
    
            lastSeriesId++;
            this.seriesMeta[lastSeriesId.toString()] = {
                id : lastSeriesId,
                name : seriesName,
                posts : []
            };
        }
        else
        {
            lastSeriesId = null;
        }

        return lastSeriesId;
    }

    /**
     * Get tag id from string. 
     * @private
     * @param {String} tag
     * @param {Boolean} append - If true, append new tag
     * @returns {Number|null}
     */
    GetTagId(tag, append = true)
    {
        if (!tag)
        {
            return null;
        }

        let lastTagId = -1;
        
        for (const key in this.tagsMeta)
        {
            lastTagId = Math.max(parseInt(key), lastTagId);

            if (this.tagsMeta[key].name === tag)
            {
                return parseInt(key);
            }
        }

        if (append)
        {
            if (lastTagId === -1)
            {
                lastTagId = 0;
            }
    
            lastTagId++;
            this.tagsMeta[lastTagId.toString()] = {
                id : lastTagId,
                name : tag,
                posts : []
            };
        }
        else
        {
            lastTagId = null;
        }

        return lastTagId;
    }
};

module.exports = {
    MDPoster,
};
