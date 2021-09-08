import { PostMetadata, SeriesMetadata, TagsMetadata } from "./models";
import Post from "./Post";

export default class PostLoader 
{
    private _postMetadatas : PostMetadata[];
    private _seriesMetadata : SeriesMetadata;
    private _tagsMetadata : TagsMetadata;

    public constructor()
    {
        this._postMetadatas = require("@/assets/.build/post.json");
        this._seriesMetadata = require("@/assets/.build/series.json");
        this._tagsMetadata = require("@/assets/.build/tags.json");
    }

    public get postMetadatas() : PostMetadata[]
    {
        return this._postMetadatas;
    }
    
    public get seriesMetadata() : SeriesMetadata
    {
        return this._seriesMetadata;
    }
    
    public get tagsMetadata() : TagsMetadata
    {
        return this._tagsMetadata;
    }

    public GetRecentPosts(count = 10, offset = 0) : Post[]
    {
        return this.postMetadatas
            .sort((a, b) => {
                if (a.date == b.date) return 0;

                if (a.date > b.date)
                {
                    return -1;
                }
                
                return 1;
            })
            .slice(offset, count).map((meta) => {
                return new Post(meta.uid, this);
            });
    }

    public GetPostById(id : number) : Post | null
    {
        try
        {
            const post = new Post(id, this);

            return post;
        } 
        catch (error) 
        {
            console.log(error);

            return null;
        }
    }
}