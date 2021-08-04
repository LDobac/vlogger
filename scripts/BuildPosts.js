const fs = require("fs/promises");
const fse = require("fs-extra");
const path = require("path");
const process = require("process");
const replaceExt = require("replace-ext");
const { MDPoster } = require("../md_poster/MDPoster");

const POSTS_DIRECTORY_PATH = "_posts";
const DEST_PATH = "src/assets/.build";

const mdPoster = new MDPoster(POSTS_DIRECTORY_PATH);

async function Run()
{
    const args = process.argv.slice(2);
    
    let fresh = false;

    fresh = args.some(arg => arg == "--fresh");

    if (fresh)
    {
        console.log("Posterization to fresh");
    }

    try 
    {
        console.log("Start posterization");

        await mdPoster.Posterization(fresh);
        
        console.log("Done posterization");
    } 
    catch (error) 
    {
        console.log("Failed to posterization");
        console.log(error);
    }

    await fse.remove(path.resolve(DEST_PATH));

    await fse.copy(
        path.resolve(POSTS_DIRECTORY_PATH, MDPoster.BUILD_DIR_NAME),
        path.resolve(DEST_PATH),
    );

    // Chagne result html file to json format
    const rawPostMeta = await fs.readFile(path.resolve(DEST_PATH, MDPoster.POSTS_METADATA_FILE));

    const postsMeta = JSON.parse(rawPostMeta);
    for (const post of postsMeta) 
    {
        const htmlFile = await fs.readFile(
            path.resolve(DEST_PATH, MDPoster.POST_BUILD_DIR_NAME, post.htmlFileName),
            {
                encoding : "utf8",
            }
        );

        const content = {
            "content" : htmlFile,
        };

        await fs.unlink(path.resolve(DEST_PATH, MDPoster.POST_BUILD_DIR_NAME, post.htmlFileName));

        post.htmlFileName = replaceExt(post.htmlFileName, ".json");
        post.htmlFilePath = path.resolve(DEST_PATH, MDPoster.POST_BUILD_DIR_NAME, post.htmlFileName);

        await fs.writeFile(
            post.htmlFilePath,
            JSON.stringify(content),
        );
    }

    await fs.writeFile(
        path.resolve(DEST_PATH, MDPoster.POSTS_METADATA_FILE), 
        JSON.stringify(postsMeta)
    );

    console.log("Success to copy assets directory");
}

Run();