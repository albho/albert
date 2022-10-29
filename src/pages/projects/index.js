import React from 'react';
import { Link } from 'gatsby';

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      <Link to="/projects/porcupine">Porcupine</Link>
      <Link to="/projects/leopard">Leopard</Link>
      <Link to="/projects/cheetah">Cheetah</Link>
    </div>
  );
};

export default Projects;
