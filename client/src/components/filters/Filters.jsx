import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
} from "../../redux/thunks/productThunk";
import "./Filter.css";

const Filters = ({ setCurrentPage, setInput }) => {
  const dispatch = useDispatch();
  const { categories, filters, order, page } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleOrderAlphabet(e) {
    dispatch(
      fetchProducts({
        filters,
        order: {
          by: "name",
          direction: e.target.value,
        },
        page,
      })
    );
    setCurrentPage(1);
    setInput(1);
  }

  function handleOrderPrice(e) {
    dispatch(
      fetchProducts({
        filters,
        order: {
          by: "price",
          direction: e.target.value,
        },
        page,
      })
    );
    setCurrentPage(1);
    setInput(1);
  }

  function handleOrderScore(e) {
    dispatch(
      fetchProducts({
        filters,
        order: {
          by: "score",
          direction: e.target.value,
        },
        page,
      })
    );
    setCurrentPage(1);
    setInput(1);
  }

  function handleChangeType(e) {
    const category = e.target.value;
    const prevCategories = (filters && filters.categories) || [];
    const newCategories = prevCategories.includes(category)
      ? // eslint-disable-next-line
        prevCategories.filter((category) => category !== category)
      : prevCategories.concat(category);
    dispatch(
      fetchProducts({
        filters: {
          ...filters,
          categories: newCategories,
        },
        order,
        page,
      })
    );
    setCurrentPage(1);
    setInput(1);
  }

  function clearFilter(e) {
    e.preventDefault();
    dispatch(
      fetchProducts({
        filters: {},
        order: {},
        page,
      })
    );
    e.target.reset();
    setCurrentPage(1);
    setInput(1);
  }

  return (
    <div>
      <div
        id="sidebar"
        className="col-10 d-flex flex-column py-2 text-center rounded colorletra"
      >
        <div className="row ">
          <div className="bg-dark rounded">
            <form
              onSubmit={clearFilter}
              id="form-filters-combined"
              class="ml-md-2"
            >
              <div className="mt-3 rounded-2 filterCategories">
                <h6 class="span-1 fw-bold">Categories</h6>
                <div>
                  {categories?.map((c) => {
                    return (
                      <div key={c._id}>
                        <input
                          type="checkbox"
                          name="categories"
                          value={c.name}
                          checked={
                            filters &&
                            filters.categories &&
                            filters.categories.includes(c.name)
                          }
                          onClick={handleChangeType}
                        />
                        <label htmlFor="categories">{c.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div class="mt-3 rounded-2 orders">
                <div class="form-inline border rounded span-sm-2 my-2">
                  <input
                    type="radio"
                    name="type"
                    value="asc"
                    id="higher"
                    onClick={handleOrderAlphabet}
                  />
                  <label class="pl-1 pt-sm-0 pt-1">&nbsp;A-Z</label>
                </div>
                <div class="form-inline border rounded span-sm-2 my-2">
                  <input
                    type="radio"
                    name="type"
                    value="desc"
                    id="order"
                    onClick={handleOrderAlphabet}
                  />
                  <label class="pl-1 pt-sm-0 pt-1">&nbsp;Z-A</label>
                </div>
                <div class="form-inline border rounded span-sm-2 my-2">
                  <input
                    type="radio"
                    name="type"
                    value="desc"
                    id="order"
                    onClick={handleOrderScore}
                  />
                  <label class="pl-1 pt-sm-0 pt-1">&nbsp;maximum score</label>
                </div>
                <div class="form-inline border rounded span-sm-2 my-2">
                  <input
                    type="radio"
                    name="type"
                    value="asc"
                    id="order"
                    onClick={handleOrderPrice}
                  />
                  <label class="pl-1 pt-sm-0 pt-1">&nbsp;lower price</label>
                </div>
                <div class="form-inline border rounded span-sm-2 my-2">
                  <input
                    type="radio"
                    name="type"
                    value="desc"
                    id="order"
                    onClick={handleOrderPrice}
                  />
                  <label class="pl-1 pt-sm-0 pt-1">&nbsp;higher price</label>
                </div>
              </div>
              {filters.categories ? (
                <button class="btn btn-warning btn-sm mb-2" type="submit">
                  Reset Filters
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
