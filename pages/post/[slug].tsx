import { GetStaticPaths } from "next";
import { Post, getPostContents, getPosts } from "..";

type StaticPathsParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<StaticPathsParams> = async () => {
  const posts = await getPosts();
  const paths: {
    params: { slug: string };
  }[] = [];
  posts.forEach((post) => {
    const slug = post.slug;
    if (slug) {
      paths.push({
        params: { slug },
      });
    }
  });
  return { paths, fallback: "blocking" };
};

import { GetStaticProps } from "next";

type StaticProps = {
  post?: Post;
};

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticPathsParams
> = async ({ params, preview }) => {
  const notFoundProps = {
    props: {},
    redirect: {
      destination: "/404",
    },
  };
  if (!params) {
    return notFoundProps;
  }
  const { slug } = params;
  const posts = await getPosts(slug);
  const post = posts.shift();
  if (!post) {
    return notFoundProps;
  }
  const contents = await getPostContents(post);
  post.contents = contents;
  return {
    props: {
      post,
    },
  };
};

import { NextPage } from "next";
import prism from "prismjs";
import { useEffect } from "react";
import { Layout } from "@/lib/component/Layout";
import { PostComponent } from "@/lib/component/Post";
const PostPage: NextPage<StaticProps> = ({ post }) => {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  if (!post) return null;

  return (
    <Layout>
      <PostComponent post={post} />
    </Layout>
  );
};

export default PostPage;
