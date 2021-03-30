import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import SkeletonLoading from "../../components/SkeletonLoading";
import {
  getProductDetails,
  clearErrors,
} from "../../redux/actions/productAction";

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDtails
  );
  console.log(product);
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <Fragment>
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <img className="d-block w-100" src="/images/product.jpg" alt="" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # </p>

              <hr />

              <div className="rating-outer">
                <div className="rating-inner"></div>
              </div>
              <span id="no_of_reviews">review</span>

              <hr />

              <p id="product_price">price</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input type="number" className="form-control count d-inline" />

                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span id="stock_status" className="greenColor">
                  stock
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>
                It helps you write applications that behave consistently, run in
                different environments (client, server, and native), and are
                easy to test. On top of that, it provides a great developer
                experience, such as live code editing combined with a time
                traveling debugger.
              </p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>seller</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              {/* <div className="alert alert-danger mt-5" type="alert">
              Login to post your review.
            </div> */}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
