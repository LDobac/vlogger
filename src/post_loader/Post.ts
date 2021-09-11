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

        const seriesMeta = postLoader.seriesMetadata[postMeta.series] ?? null;
        const tagsMeta = postMeta.tags.map((index) => {
            return postLoader.tagsMetadata[index];
        });

        this.postMeta = postMeta;
        this.seriesMeta = seriesMeta;
        this.tagsMeta = tagsMeta;

        if (this.seriesMeta)
        {
            const index = this.seriesMeta.posts.findIndex(element => element === this.uid);

            this._nextPostId = this.seriesMeta.posts[index + 1] ?? null;
            this._prevPostId = this.seriesMeta.posts[index - 1] ?? null;
        }
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

    public get thumbnail() : string
    {
        return this.postMeta.thumbnail;
    }

    public get summery() : string
    {
        return this.postMeta.summery;
    }

    public get series() : Series | null
    {
        return this.seriesMeta;
    }

    public get tags() : Tag[]
    {
        return this.tagsMeta;
    }
    
    public get postContent() : string 
    {
        const htmlFile = require(`@/assets/.build/build_posts/${this.postMeta.htmlFileName}`);

        return htmlFile.content;
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