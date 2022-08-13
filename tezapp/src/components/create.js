import { useState } from "react";
import { useHistory } from "react-router-dom";


const Create = () => {
  const [uuid, setUUID] = useState('');
  const [email, setEmail] = useState('');
  const [user_type, setUserType] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { uuid, email, user_type };

    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      // history.go(-1);
      history.push('/');
    })
  }

  return (
    //creating form for applic
    <div className="create">
      <div className="container">
        <h2>Add Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>UUID : </label>
          <input
            type="text"
            required
            value={uuid}
            onChange={(e) => setUUID(e.target.value)}
          />


          <label>Email :</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>User Type : </label>
          <select
            value={user_type}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="investor">Investor</option>
            <option value="fundraiser">Fundraiser</option>
          </select>
          {/*<label>Company Type :</label>
        <input
          type="text"
          required
          value={company_type}
          onChange={(e) => setCompanyType(e.target.value)}
        />

        <label>Goal :</label>
        <input
          type="number"
          required
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <label>Timestamp :</label>
        <input
          type="time"
          required
          value={timestamp}
          onChange={(e) => setTimeStamp(e.target.value)}
  />*/}
          <button>Add Profile</button>
        </form>
      </div>
    </div>
  );
}

export default Create;