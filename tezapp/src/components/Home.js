import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8000/blogs')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
            {/* Action Buttons */}
            <button onClick={ongiveFund} className="btn btn-primary btn-lg">
              {/* TODO 7.b - Call onBuyTicket on click */}
              {/* TODO 7.c - Show "loading..." when buying operation is pending */}
              {loading ? "Loading..." : "Give fund"}
            </button>

      </div >
    </div>
    
  );
}
 
export default Home;