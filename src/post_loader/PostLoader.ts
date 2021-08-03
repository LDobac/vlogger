import { PostMetadata, SeriesMetadata, TagsMetadata } from "./models";

export default class PostLoader 
{
    private postMetadatas : PostMetadata[];
    private seriesMetadata : SeriesMetadata;
    private tagsMetadata : TagsMetadata;

    public constructor()
    {
        this.postMetadatas = require("@/assets/.build/post.json");
        this.seriesMetadata = require("@/assets/.build/series.json");
        this.tagsMetadata = require("@/assets/.build/tags.json");
    }

    public GetRecentPosts(count = 10, offset = 0)
    {
        return this.postMetadatas.slice(offset, count);
    }

    public GetPostContent(postMeta : PostMetadata)
    {
        const fileName = postMeta.htmlFileName;

        const htmlFile = require(`@/assets/.build/build_posts/${fileName}`);

        return htmlFile;
    }
}