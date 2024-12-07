import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<Loader className="loader" />}>
            <Await
              resolve={data.postResponse}
              errorElement={<p className="noData">Error loading posts!</p>}
            >
              {(postResponse) => (
                <>
                  {postResponse.data.length > 0 ? (
                    postResponse.data.map((post) => (
                      <Card key={post.id} item={post} />
                    ))
                  ) : (
                    <p className="noData">No data display in your area</p>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<Loader className="loader" />}>
          <Await
            resolve={data.postResponse}
            errorElement={<p className="noData">Error loading map!</p>}
          >
            {(postResponse) =>
              postResponse.data.length > 0 ? (
                <Map items={postResponse.data} />
              ) : (
                <p className="noData">No data to display on the map</p>
              )
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
