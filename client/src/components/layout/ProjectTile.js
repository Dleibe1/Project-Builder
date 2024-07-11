import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ProjectForksButton from "./ProjectForksButton";

const ProjectTile = ({ title, createdBy, thumbnailImage, id }) => {
  const [hasForks, setHasForks] = useState(false);
  const history = useHistory();

  const checkForForks = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}/fork-list`);
      if (!response.ok) {
        const newError = new Error("Error in the fetch!");
        throw newError;
      }
      const responseBody = await response.json();
      if (responseBody.forks.length) {
        setHasForks(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkForForks();
  }, []);

  const handleTileClick = () => {
    history.push(`/projects/${id}`);
  };

  return (
    <div className="project-tile" onClick={handleTileClick}>
      <div className="thumbnail-image-container">
        <img className="thumbnail-image" src={thumbnailImage} alt={`${title} thumbnail`} />
      </div>
      <h3>{title}</h3>
      <h4>Created By:</h4>
      <h5>{createdBy}</h5>
      {hasForks ? (
        <div className="button-container" onClick={(e) => e.stopPropagation()}>
          <ProjectForksButton id={id} />
        </div>
      ) : null}
    </div>
  );
};

export default ProjectTile;
