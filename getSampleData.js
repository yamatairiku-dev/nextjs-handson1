const { Client } = require("@notionhq/client");
const fs = require("fs");

const notion = new Client({
  auth: "secret_BzRN2u0a7AEWcaFPHYgncEfZDIiQsK7p3QdjDlp01L2",
});

const asyncFunc = async () => {
  const database = await notion.databases.query({
    database_id: "fe7ed8cd9f7242218ec0e72009e6f402",
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  console.dir(database, { depth: null });
  // fs.writeFileSync("samplePostsData.json", JSON.stringify(database));
};

asyncFunc();
