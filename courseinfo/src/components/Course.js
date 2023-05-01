const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => (
            <div key={part.id}>
              <p>
                {part.name} {part.exercises}
              </p>
            </div>
          ))}
          <h4>
            total of{" "}
            {course.parts.reduce((sum, part) => {
              return sum + part.exercises;
            }, 0)}{" "}
            exercises
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Course;
