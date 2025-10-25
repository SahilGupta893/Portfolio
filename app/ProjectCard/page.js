// ProjectCard.jsx
import { FaGithub, FaVideo } from "react-icons/fa";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">


      {/* Project Image */}
     {project?.image && (
  <Image
    src={project.image}
    alt={project.title || "Project"}
    width={400}
    height={300}
    className="w-full h-full object-cover rounded-lg"
  />
)}

      <div className="p-5 flex flex-col flex-1">
        {/* Project Title */}
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        {/* Project Description */}
        <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
  <a
    href={project.repoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-purple-800 transition-colors px-4 py-2 rounded-lg font-medium"
  >
    <FaGithub /> Code
  </a>
  {project.liveUrl && (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-lg font-medium"
    >
      <FaVideo /> Demo
    </a>
  )}
</div>
      </div>
    </div>
  );
};

export default ProjectCard;
