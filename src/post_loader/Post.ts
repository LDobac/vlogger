import dayjs, { Dayjs } from "dayjs";
import { PostMetadata, Series, Tag } from "./models";
import PostLoader from "./PostLoader";

export default class Post
{
    private postMeta : PostMetadata;
    private seriesMeta : Series | null;
    private tagsMeta : Tag[];

    private _nextPostId : number | null = null;
    private _prevPostId : number | null = null;

    public constructor(id : number, postLoader : PostLoader)
    {
        const postMeta = postLoader.postMetadatas.find((meta) => meta.uid === id);
        if (!postMeta)
        {
            throw new Error("Faild to find post metadata by id");
        }

        const seriesMeta = postMeta.series ? postLoader.seriesMetadata[postMeta.series] : null;
        const tagsMeta = postMeta.tags.map((index) => {
            return postLoader.tagsMetadata[index];
        });

        this.postMeta = postMeta;
        this.seriesMeta = seriesMeta;
        this.tagsMeta = tagsMeta;

        if (this.seriesMeta)
        {
            const posts = this.seriesMeta.posts;

            if (posts.length > 0) 
            {
                const index = posts.findIndex(element => element === this.uid);

                if (index > -1) 
                {
                    this._nextPostId = posts[index + 1] || null;
                    this._prevPostId = posts[index - 1] || null;
                }
            }
        }
    }

    public async GetContent() : Promise<string>
    {
        const contentPath = this.postMeta.htmlFileName.replace(/\.[^\/.]+$/, "");
        // In vite dynamic import, path must be have static extension
        const htmlFile = await import(`@/assets/.build/build_posts/${contentPath}.json`);

        return htmlFile.content;
    }

    public get uid() : number
    {
        return this.postMeta.uid;
    }

    public get title() : string
    {
        return this.postMeta.title;
    }

    public get date() : Dayjs
    {
        return dayjs(this.postMeta.date);
    }

    public get lastEditDate() : Dayjs | null
    {
        if (this.postMeta.lastEditDate)
        {
            return dayjs(this.postMeta.lastEditDate);
        }

        return null;
    }

    public get slug() : string
    {
        return this.postMeta.slug;
    }

    public get thumbnail() : string
    {
        return this.postMeta.thumbnail;
    }

    public get summary() : string
    {
        return this.postMeta.summary;
    }

    public get series() : Series | null
    {
        return this.seriesMeta;
    }

    public get tags() : Tag[]
    {
        return this.tagsMeta;
    }

    public get nextSeriesId() : number | null
    {
        return this._nextPostId;
    }

    public get prevSeriesId() : number | null
    {
        return this._prevPostId;
    }
}
