import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({ courseName }: {courseName: string}) => {

  return (<h1>{courseName}</h1>);
}


const Part = ({ part }: {part: CoursePart}) => {
  switch(part.type) {
    case "normal":
      return (
        <div>
          <span style={{fontWeight: "bold"}}>
            {part.name} {part.exerciseCount}
          </span>
          <br/>
          <span style={{fontStyle: "italic"}}>
            {part.description}
          </span>
        </div>);
    case "groupProject":
      return (
        <div>
          <span style={{fontWeight: "bold"}}>
            {part.name} {part.exerciseCount}
          </span>
          <br/>
          <span>
            project exercises: {part.groupProjectCount}
          </span>
        </div>);
    case "submission":
      return (
        <div>
          <span style={{fontWeight: "bold"}}>
            {part.name} {part.exerciseCount}
          </span>
          <br/>
          <span style={{fontStyle: "italic"}}>
            {part.description}
          </span>
          <br/>
          <span>
            submit to: {part.exerciseSubmissionLink}
          </span>
        </div>);
    case "special":
      return (
        <div>
          <span style={{fontWeight: "bold"}}>
            {part.name} {part.exerciseCount}
          </span>
          <br/>
          <span style={{fontStyle: "italic"}}>
            {part.description}
          </span>
          <br/>
          <span>
            required skills: {part.requirements.join(", ")}
          </span>
        </div>);
    default:
      return assertNever(part);
  }


}

const Content = ({ courseParts }: {courseParts: Array<CoursePart>}) => {
  return (
    <>
    { courseParts.map(part => (
    <p key={part.name}>
      <Part part={part} />
      </p>)) }
    </>);
}

const Total = ({ courseParts }: {courseParts: Array<CoursePart>}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default App;