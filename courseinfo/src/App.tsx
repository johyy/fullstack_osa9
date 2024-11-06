interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Part = (part: CoursePart) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercise count: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Group project count: {part.groupProjectCount}</p>
          <p>Exercise count: {part.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
          <p>Exercise count: {part.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Requirements:</p>
          <ul>
            {part.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          <p>Exercise count: {part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled course part type: ${JSON.stringify(value)}`
  );
};

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} {...part} />
    ))}
  </div>
);

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
