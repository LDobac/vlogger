const { MDBuilder, MDPostData } = require("../../md_poster/MDBuilder");

const mdOnlyMeta = `
---
layout: post
title:  "Chapter 2 : Application Layer"
date:   2021-04-13 22:06:43 +0900
categories: jekyll update
---

`;

describe("Unit test for MDBuilder class", () => {
    beforeEach(() => {
        this.mdBuilder = new MDBuilder();
    });

    it("Test parsing metadata", () => {
        const postData = this.mdBuilder.Parse(mdOnlyMeta);

        const metadataText = `
        layout: post
        title:  "Chapter 2 : Application Layer"
        date:   2021-04-13 22:06:43 +0900
        categories: jekyll update
        `;

        // expect(postData.content).toBe(mdOnlyMeta);
    });
});