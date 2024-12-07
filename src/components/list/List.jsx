import "./list.scss";
import Card from "../card/Card";

function List({ posts, isLoading }) {
  return (
    <div className="list">
      {isLoading
        ? // Render skeleton loaders while loading
          Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} item={null} isLoading={true} />
          ))
        : // Render actual posts when loading is complete
          posts.map((item) => <Card key={item.id} item={item} isLoading={false} />)}
    </div>
  );
}

export default List;
