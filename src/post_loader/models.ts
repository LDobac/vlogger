interface Series 
{
    id : number;
    name : string;
    posts : number[];
};

interface SeriesMetadata 
{
    [key : string] : Series;
};

interface Tag 
{
    id : number;
    name : string;
    posts : number[];
};

interface TagsMetadata {
    [key : string] : Tag;
};

interface PostMetadata 
{
    uid : number;
    title : string;
    thumbnail : string;
    summary : string;
    date : string;
    lastEditDate? : string;
    slug: string;
    series : number | null;
    tags : number[];
    originFile : string;
    htmlFileName : string;
};

interface IPostFilter
{
    type : string;
    id : number;
}

export type {
    Series,
    Tag,
    PostMetadata,
    SeriesMetadata,
    TagsMetadata,
    IPostFilter
};
