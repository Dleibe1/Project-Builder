import React, { useEffect, useState } from 'react';

const UserRepos = ({ token }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`/api/v1/github-user-sessions/repos?token=${token}`);
        setRepos(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepos();
  }, [token]);

  return (
    <div>
      <h2>Your Repositories</h2>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;
