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
    summery : string;
    date : Date;
    series : number;
    tags : number[];
    originFile : string;
    htmlFileName : string;
};

export {
    Series,
    Tag,
    PostMetadata,
    SeriesMetadata,
    TagsMetadata,
};