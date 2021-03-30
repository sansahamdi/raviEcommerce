import React, { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import SkeletonLoading from "./SkeletonLoading";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productAction";
import { useAlert } from "react-alert";

import "../App.css";

const Home = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <Fragment>
          <MetaData title={"Buy best products online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
