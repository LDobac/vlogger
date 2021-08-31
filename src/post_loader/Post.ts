import dayjs, { Dayjs } from "dayjs";
import { PostMetadata, Series, Tag } from "./models";
import PostLoader from "./PostLoader";

export default class Post
{
    private postMeta : PostMetadata;
    private seriesMeta : Series;
    private tagsMeta : Tag[];

    public constructor(id : number, postLoader : PostLoader)
    {
        const postMeta = postLoader.postMetadatas.find((meta) => meta.uid === id);
        if (!postMeta)
        {
            throw new Error("Faild to find post metadata by id");
        }

        const seriesMeta = postLoader.seriesMetadata[postMeta.series];
        const tagsMeta = postMeta.tags.map((index) => {
            return postLoader.tagsMetadata[index];
        });

        this.postMeta = postMeta;
        this.seriesMeta = seriesMeta;
        this.tagsMeta = tagsMeta;
    }

    public get title() : string
    {
        return this.postMeta.title;
    }

    public get date() : Dayjs
    {
        return dayjs(this.postMeta.date);
    }
    
    public get postContent() : string 
    {
        const htmlFile = require(`@/assets/.build/build_posts/${this.postMeta.htmlFileName}`);

        return htmlFile.content;
    }
}