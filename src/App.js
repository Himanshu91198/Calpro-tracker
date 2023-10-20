import { useState } from "react";

export default function App() {
  const [entry, setEntry] = useState({});
  const [showInformation, setShowInformation] = useState(false);

  console.log(entry);

  return (
    <div className="app">
      <Register onEntry={setEntry} handleShowInformation={setShowInformation} />
      {showInformation && <Information entry={entry} />}
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////
// Register Component
////////////////////////////////////////////////////////////////////////////////////

function Register({ onEntry, handleShowInformation }) {
  return (
    <section className="register">
      <h1>😋 Lets track your diet 🥗</h1>
      <Form onEntry={onEntry} onShowInformation={handleShowInformation} />
    </section>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Form component
///////////////////////////////////////////////////////////////////////////////////////////////////

function Form({ onEntry, onShowInformation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [desWeight, setDesWeight] = useState("");
  const [maingoal, setMainGoal] = useState("cutt");

  function handleSubmit(e) {
    e.preventDefault();

    const Person = {
      name: name,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      desWeight: desWeight,
      maingoal: maingoal,
    };

    onEntry(Person);
    setName("");
    setGender("Male");
    setHeight("");
    setWeight("");
    setDesWeight("");
    setMainGoal("Cut");
    setAge("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-side-left">
        <label for="name">Enter name :</label>
        <label for="gender">Gender :</label>
        <label for="age">Age (in yrs) :</label>
        <label for="height">Height (in cm) :</label>
        <label for="weight">Weight (in kg) :</label>
        <label for="des-weight">Desired weight (in kg) :</label>
        <label for="goal">Main Goal :</label>
      </div>
      <div className="form-side-right">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          name="height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <input
          type="text"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <input
          type="text"
          name="des-weight"
          value={desWeight}
          onChange={(e) => setDesWeight(Number(e.target.value))}
        />
        <select value={maingoal} onChange={(e) => setMainGoal(e.target.value)}>
          <option value="cutt">Cutt</option>
          <option value="gain">Gain</option>
          <option value="bulk">Bulk</option>
        </select>
        <Button onClick={() => onShowInformation(true)}>Submit</Button>
      </div>
    </form>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button component
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Information component
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function Information({ entry }) {
  const mensBMR =
    88.362 + 13.397 * entry.weight + 4.799 * entry.height - 5.677 * entry.age;
  const womensBMR =
    447.593 + 9.247 * entry.weight + 3.098 * entry.height - 4.33 * entry.age;
  const [calorie1, setCalorie1] = useState("");
  const [calorie2, setCalorie2] = useState("");
  const [calorie3, setCalorie3] = useState("");
  const [calorie4, setCalorie4] = useState("");
  const [protein1, setProtein1] = useState("");
  const [protein2, setProtein2] = useState("");
  const [protein3, setProtein3] = useState("");
  const [protein4, setProtein4] = useState("");
  const reqCalorie = calorie1 + calorie2 + calorie3 + calorie4;
  const reqProtein = protein1 + protein2 + protein3 + protein4;
  const BMR =
    entry.gender === "Male" ? Math.round(mensBMR) : Math.round(womensBMR);
  const [showResult, setShowResult] = useState(false);
  const [showButton, setShowButton] = useState(true);

  function handleButton() {
    setShowResult(true);
    setShowButton(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowButton(false);
    setShowResult(true);
  }

  return (
    <section className="main-info">
      <div className="information">
        <h1>Hello {entry.name} 👋</h1>
        <h3>Welcome to your {entry.maingoal}ing journey 🚀</h3>
        <label>
          {entry.name}'s BMR:
          <input type="text" value={BMR} disabled></input>
        </label>
      </div>
      <form className="tracking" onSubmit={handleSubmit}>
        <Meal
          calorie={calorie1}
          setCalorie={setCalorie1}
          protein={protein1}
          setProtein={setProtein1}
        >
          Meal 1:{" "}
        </Meal>
        <br />
        <Meal
          calorie={calorie2}
          setCalorie={setCalorie2}
          protein={protein2}
          setProtein={setProtein2}
        >
          Meal 2:{" "}
        </Meal>
        <br />
        <Meal
          calorie={calorie3}
          setCalorie={setCalorie3}
          protein={protein3}
          setProtein={setProtein3}
        >
          Meal 3:{" "}
        </Meal>
        <br />
        <Meal
          calorie={calorie4}
          setCalorie={setCalorie4}
          protein={protein4}
          setProtein={setProtein4}
        >
          Meal 4:{" "}
        </Meal>
        <br />
      </form>
      {showButton && (
        <Button className="button" onClick={handleButton}>
          Submit
        </Button>
      )}
      {showResult && (
        <Result
          entry={entry}
          reqCalorie={reqCalorie}
          reqProtein={reqProtein}
          BMR={BMR}
        />
      )}
    </section>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Meal component
////////////////////////////////////////////////////////////////////////////////////////////////////////

function Meal({ children, calorie, setCalorie, protein, setProtein }) {
  return (
    <div className="meal">
      <span>{children}</span>Enter calories
      <input
        type="text"
        value={calorie}
        onChange={(e) => setCalorie(Number(e.target.value))}
      ></input>
      <span>Enter protein</span>
      <input
        type="text"
        value={protein}
        onChange={(e) => setProtein(Number(e.target.value))}
      ></input>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Result component
///////////////////////////////////////////////////////////////////////////////////////////////////////

function Result({ entry, reqCalorie, reqProtein, BMR }) {
  return (
    <div className="result">
      {entry.maingoal === "cutt" && reqCalorie < BMR && (
        <p>
          You have reached your <mark>calorie deficit</mark> for the day! 🥳
        </p>
      )}
      {entry.maingoal === "cutt" && reqCalorie > BMR && (
        <p>
          You have not r eached your <mark>calorie deficit</mark> for the day!
          ☹️ to reach <mark>{entry.desWeight}kg.</mark>
        </p>
      )}
      {entry.maingoal === "gain" && reqCalorie === BMR && (
        <p>
          You have reached your <mark>calorie goal</mark> for the day! 🥳
        </p>
      )}
      {entry.maingoal === "gain" && reqCalorie !== BMR && (
        <p>
          You have not reached your <mark>calorie goal</mark> for the day! ☹️ to
          maintain <mark>{entry.desWeight}kg.</mark>
        </p>
      )}
      {entry.maingoal === "bulk" && reqCalorie > BMR && (
        <p>
          You have reached your <mark>calorie surplus</mark> for the day! 🥳
        </p>
      )}
      {entry.maingoal === "bulk" && reqCalorie < BMR && (
        <p>
          You have not reached your <mark>calorie surplus</mark> for the day! ☹️
          to reach <mark>{entry.desWeight}kg.</mark>
        </p>
      )}
      {entry.gender === "Male" && reqProtein >= entry.weight * 2 && (
        <p>
          You have reached your <mark>protein</mark> goal for the day! 🎉
        </p>
      )}
      {entry.gender === "Male" && reqProtein < entry.weight * 2 && (
        <p>
          You have not reached your <mark>protein</mark> goal for the day! 😔
        </p>
      )}
      {entry.gender === "Female" && reqProtein >= entry.weight * 1.5 && (
        <p>
          You have reached your <mark>protein</mark> goal for the day! 🎉
        </p>
      )}
      {entry.gender === "Female" && reqProtein < entry.weight * 1.5 && (
        <p>
          You have not reached your <mark>protein</mark> goal for the day! 😔
        </p>
      )}
    </div>
  );
}
