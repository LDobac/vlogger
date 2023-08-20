import { IPostFilter, PostMetadata, SeriesMetadata, TagsMetadata } from "./models";
import Post from "./Post";

export default class PostLoader 
{
    private _postMetadatas : PostMetadata[];
    private _seriesMetadata : SeriesMetadata;
    private _tagsMetadata : TagsMetadata;

    public dataHasLoaded : boolean;

    public constructor()
    {
        this._postMetadatas = new Array<PostMetadata>();
        this._seriesMetadata = {};
        this._tagsMetadata = {};

        this.dataHasLoaded = false;
    }

    public async LoadMetadatas() : Promise<void>
    {
        this._postMetadatas = (await import("@/assets/.build/post.json")).default;
        this._seriesMetadata = (await import("@/assets/.build/series.json")).default;
        this._tagsMetadata = (await import("@/assets/.build/tags.json")).default;
        
        this.dataHasLoaded = true;
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

    public GetRecentPosts(count = 10, offset = 0, filter : IPostFilter | null = null) : Post[]
    {
        let posts = this.postMetadatas
            .sort((a, b) => {
                if (a.date == b.date) return 0;

                if (a.date > b.date)
                {
                    return -1;
                }
                            
                return 1;
            });

        if (filter)
        {
            posts = posts.filter((postMeta) => {
                if (filter.type == "series")
                {
                    return filter.id === postMeta.series;
                }
                else if (filter.type == "tag")
                {
                    return postMeta.tags.includes(filter.id);
                }
            });
        }

        if (count == -1)
        {
            return posts.map((meta) => {
                return new Post(meta.uid, this);
            });
        }
        else
        {
            return posts.slice(offset, count).map((meta) => {
                return new Post(meta.uid, this);
            });
        }
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

    public GetPostBySlug(slug : string) : Post | null
    {
        try
        {
            const postMeta = this.postMetadatas.find((v) => v.slug === slug);
            if (!postMeta) throw new Error("Faild to find post metadata by slug");
            
            const post = new Post(postMeta.uid, this);

            return post;
        } 
        catch (error) 
        {
            console.log(error);

            return null;
        }
    }
}
