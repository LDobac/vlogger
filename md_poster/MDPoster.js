const fs = require("fs/promises");
const path = require("path");
const moment = require("moment");
const replaceExt = require("replace-ext");
const { MDBuilder, MDPostData } = require("./MDBuilder");
const { MDNotValidData } = require("./MDExceptions");

class MDPoster
{
    static BUILD_DIR_NAME = ".build";
    static POST_BUILD_DIR_NAME = "build_posts";
    static POSTS_METADATA_FILE = "post.json";
    static SERIES_METADATA_FILE = "series.json";
    static TAGS_METADATA_FILE = "tags.json";

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
    }

    async Posterization(refresh = false)
    {
        await this.CheckDirectories();

        let postsMeta = [];
        let seriesMeta = {};
        let tagsMeta = {};

        if (!refresh)
        {
            try 
            {
                const rawPostMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.POSTS_METADATA_FILE), {
                    "encoding" : "utf8"
                });

                postsMeta = JSON.parse(rawPostMeta);
            } 
            catch (error) 
            {
                postsMeta = [];
            }

            try 
            {
                const rawSeriesMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.SERIES_METADATA_FILE), {
                    "encoding" : "utf8"
                });

                seriesMeta = JSON.parse(rawSeriesMeta);
            } 
            catch (error) 
            {
                seriesMeta = {};
            }

            try 
            {
                const rawTagsMeta = await fs.readFile(path.resolve(this.buildDir, MDPoster.TAGS_METADATA_FILE), {
                    "encoding" : "utf8"
                });

                tagsMeta = JSON.parse(rawTagsMeta);
            } 
            catch (error) 
            {
                tagsMeta = {};
            }
        }

        const unparsedMDList = await this.ReadChangedMDList(postsMeta);

        for (const [index, markdownFile] of unparsedMDList.entries())
        {
            const rawMarkdown = await fs.readFile(path.resolve(this.savedDir, markdownFile.name), {
                encoding : "utf8"
            });

            const mdPostData = this.mdBuilder.Parse(rawMarkdown);

            await this.AppendPostsMetadata(markdownFile.name, mdPostData, postsMeta, seriesMeta, tagsMeta);
        }

        const timeSortFunc = (a, b) => {
            const dateA = moment(a.date);
            const dateB = moment(b.date);

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

        postsMeta.sort(timeSortFunc);

        for (const key in seriesMeta)
        {
            const seriesPostIds = seriesMeta[key].posts;
            const seriesPosts = {};

            postsMeta.forEach((element) => {
                if (seriesPostIds.includes(element.uid))
                {
                    seriesPosts[element.uid.toString()] = element;
                }
            });

            seriesPostIds.sort(timeSortFunc);
        }

        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.POSTS_METADATA_FILE),
            JSON.stringify(postsMeta),
            {
                "encoding" : "utf8"
            });
        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.SERIES_METADATA_FILE), 
            JSON.stringify(seriesMeta),
            {
                "encoding" : "utf8"
            });
        await fs.writeFile(
            path.resolve(this.buildDir, MDPoster.TAGS_METADATA_FILE), 
            JSON.stringify(tagsMeta),
            {
                "encoding" : "utf8"
            });
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
     * @param {Array<Object>} postsMeta 
     */
    async ReadChangedMDList(postsMeta)
    {
        const fileList = await fs.readdir(this.savedDir, {
            encoding : "utf8",
            withFileTypes : true
        });

        const markdownFileList = fileList.filter((file) => {
            if (!file.isFile()) return false;

            const mdFormatExt = [
                ".md",
                ".MD",
                ".markdown",
            ];

            const ext = path.extname(file.name);

            if (mdFormatExt.includes(ext))
            {
                return !postsMeta.some(meta => meta.originFile === file.name);
            }
        });

        return markdownFileList;
    }

    /**
     * Append post data to meta objects and write rendered html file to disk
     * @param {String} originFile
     * @param {MDPostData} mdPostData 
     * @param {Array<Object>} postsMeta 
     * @param {Object} seriesMeta 
     * @param {Object} tagsMeta 
     */
    async AppendPostsMetadata(originFile, mdPostData, postsMeta, seriesMeta, tagsMeta)
    {
        const newPostId = this.GetLastPostId(postsMeta) + 1;
        const htmlFile = path.resolve(
                            this.buildDir, 
                            MDPoster.POST_BUILD_DIR_NAME,
                            replaceExt(originFile, ".html")
                        );

        let seriesId = null;
        let tagIds = [];

        if (mdPostData.seriesName)
        {
            seriesId = this.GetSeriesId(mdPostData.seriesName, seriesMeta);

            seriesMeta[seriesId.toString()].posts.push(newPostId);
        }

        tagIds = mdPostData.tags.map((tag) => {
            const tagId = this.GetTagId(tag, tagsMeta);

            tagsMeta[tagId.toString()].posts.push(newPostId);

            return tagId;
        });

        await fs.writeFile(
                htmlFile,
                mdPostData.content, 
                {
                    "encoding" : "utf8",
                });

        postsMeta.push({
            uid : newPostId,
            title : mdPostData.title,
            date : mdPostData.date,
            series : seriesId,
            tags : tagIds,
            originFile : originFile,
            htmlFile : htmlFile,
        });
    }

    /**
     * Get last post id from posts metadata
     * @param {Array<Object>} postsMeta 
     * @returns {Number}
     */
    GetLastPostId(postsMeta)
    {
        let lastId = -1;

        for (const meta of postsMeta) 
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
     * Get series id from seriesName. If not exists, append new series and return.
     * @param {String} seriesName 
     * @param {Object} seriesMeta 
     * @throws
     * @returns {Number}
     */
    GetSeriesId(seriesName, seriesMeta)
    {
        if (!seriesName)
        {
            throw new MDNotValidData("series name not valid!");
        }

        let lastSeriesId = -1;
        
        for (const key in seriesMeta)
        {
            lastSeriesId = Math.max(parseInt(key), lastSeriesId);

            if (seriesMeta[key].name === seriesName)
            {
                return key;
            }
        }

        if (lastSeriesId === -1)
        {
            lastSeriesId = 0;
        }

        lastSeriesId++;
        seriesMeta[lastSeriesId.toString()] = {
            name : seriesName,
            posts : []
        };

        return lastSeriesId;
    }

    /**
     * Get tag id from string. If not exists, append new tag and return.
     * @param {String} tag
     * @param {Object} tagsMeta 
     * @throws
     * @returns {Number}
     */
    GetTagId(tag, tagsMeta)
    {
        if (!tag)
        {
            throw new MDNotValidData("tag name not valid!");
        }

        let lastTagId = -1;
        
        for (const key in tagsMeta)
        {
            lastTagId = Math.max(parseInt(key), lastTagId);

            if (tagsMeta[key].name === tag)
            {
                return key;
            }
        }

        if (lastTagId === -1)
        {
            lastTagId = 0;
        }

        lastTagId++;
        tagsMeta[lastTagId.toString()] = {
            name : tag,
            posts : []
        };

        return lastTagId;
    }
};

module.exports = {
    MDPoster,
};