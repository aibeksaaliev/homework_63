import React from 'react';
import {PostType} from "../../types";
import {Link} from "react-router-dom";
import ReactTooltip from "react-tooltip";

interface PostCardProps {
  post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
  return (
    <>
      <div className="card w-75 m-auto mb-2">
        <div className="card-header d-flex justify-content-between">
          <span className="text-capitalize fw-bold">{post.title}</span>
          <span>{post.time}</span>
        </div>
        <div className="card-body">
          <p className="card-text">{post.description}</p>
          <div className="d-flex">
            <Link
              to={"/posts/" + post.id}
              className="btn btn-dark rounded-circle ms-auto"
              style={{padding: "6px 10px"}}
              data-tip data-for="read-more"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </Link>
            <ReactTooltip
              id="read-more"
              place="left"
              effect="solid"
            >Read more
            </ReactTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;