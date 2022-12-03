import React, {useCallback, useEffect, useState} from 'react';
import {PostsType, PostType} from "../../types";
import axiosApi from "../../axiosApi";
import PostCard from "../../components/PostCard/PostCard";
import BlogSpinner from "../../components/BlogSpinner/BlogSpinner";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const postsResponse = await axiosApi.get<PostsType>("/posts.json");
      const arr: PostType[] = [];
      for (let key in await postsResponse.data){
        arr.push({
          id: key,
          title: postsResponse.data[key].title,
          description: postsResponse.data[key].description,
          time: postsResponse.data[key].time
        });
      }
      setPosts(arr);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts().catch(console.error);
  }, [fetchPosts]);

  let pageContent = (
    <Container className="my-3">
      {posts.map(item => (
        <PostCard key={item.id} post={item}/>
      ))}
    </Container>
  )

  if (loading) {
    pageContent = <BlogSpinner/>
  }

  return (
    <>
      {pageContent}
    </>
  );
};

export default Home;