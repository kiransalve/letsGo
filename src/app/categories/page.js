"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfile } from "../components/layout/UserProfile";
import toast from "react-hot-toast";
import DeleteButton from "../components/layout/DeleteButton";
import Image from "next/image";

const CategoriesPage = () => {
  const { loading: profileLoading, data: profileData } = UserProfile();
  const [catVal, setCatVal] = useState("");
  const [catImage, setCatImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [editedCat, setEditedCat] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCat();
  }, []);

  const fetchCat = () => {
    fetch("/api/categories").then((res) => {
      res.json().then((cat) => {
        setCategories(cat);
      });
    });
  };

  if (profileLoading) {
    return "Profile data Loading...";
  }

  const handleNewCat = async (e) => {
    e.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const data = {
        name: catVal,
        catImage: catImage,
        subTitle: subTitle,
        title: title,
      };
      if (editedCat) {
        data._id = editedCat._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCat?.name ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        fetchCat();
        resolve();
        setCatVal("");
        setEditedCat(null);
        setCatImage("");
        setTitle("");
        setSubTitle("");
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: `${editedCat?.name ? "Updating" : "Creating"} your new category`,
      success: `${catVal} Category ${editedCat?.name ? "Updated" : "Created"}`,
      error: "Error",
    });
  };

  const handleDeleteCat = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
    fetchCat();
  };

  return (
    <section className="mt-8 mx-auto max-w-3xl ">
      {!profileData.admin && (
        <div className="mt-24 flex items-center justify-center">
          <div className="bg-red-600 max-w-xl text-white p-2 rounded-lg ">
            You are not authorized to view this page
          </div>
        </div>
      )}

      {profileData.admin && (
        <>
          <UserTabs isAdmin={true} />
          <form
            className="mt-8 md:max-w-xl max-w-lg mx-auto"
            type="submit"
            onSubmit={handleNewCat}
          >
            <div className="mt-2 mx-2">
              <label className="text-md text-gray-700">
                {editedCat?.name ? "Update Category : " : "New Category : "}
                {editedCat?.name && <b>: {editedCat.name}</b>}
              </label>
              <div className="flex gap-2 flex-col mt-4">
                <div>
                  <label>Category Name : </label>
                  <input
                    className="inputStyle"
                    type="text"
                    onChange={(e) => setCatVal(e.target.value)}
                    value={catVal}
                  />
                </div>

                <div>
                  <label>Category Image Link :</label>
                  <input
                    className="inputStyle"
                    type="text"
                    onChange={(e) => setCatImage(e.target.value)}
                    value={catImage}
                  />
                </div>

                <div>
                  <label>Title :</label>
                  <input
                    className="inputStyle"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>

                <div>
                  <label>Category Subtitle :</label>
                  <input
                    className="inputStyle"
                    type="text"
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                  />
                </div>

                <div className="flex gap-3 justify-center items-end pb-4">
                  <div>
                    <button
                      type="submit"
                      className="outline-none border rounded-xl border-gray-700 px-2 py-2  text-gray-700 font-semibold"
                    >
                      {editedCat?.name ? "Update" : "Create"}
                    </button>
                  </div>
                  <div>
                    <button
                      className="outline-none border rounded-xl border-gray-700 px-2 py-2  text-gray-700 font-semibold"
                      type="button"
                      onClick={() => {
                        setEditedCat(null);
                        setCatVal("");
                        setCatImage("");
                        setTitle("");
                        setSubTitle("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="md:mx-0 mx-1">
            {categories?.length === 0 && (
              <div className="mt-4 text-md text-gray-500 mb-2">
                Please Add Category
              </div>
            )}
            {categories?.length > 0 && (
              <h2 className="mt-4 text-center text-md text-gray-500 mb-2">
                Existing Category :{" "}
              </h2>
            )}
            <div className="overflow-scroll h-96">
              {categories?.length > 0 &&
                categories.map((c, index) => (
                  <div key={index}>
                    <div className="flex md:max-w-5xl max-w-md md:flex-row flex-col gap-5 border cursor-pointer rounded-xl p-1 mb-2 px-2 items-center">
                      <div className="flex-1">
                        <Image
                          src={c.catImage}
                          className=" rounded-lg my-1"
                          width={400}
                          height={400}
                          alt="img1"
                        />
                      </div>
                      <div className="flex-1 mt-4">
                        <div className="flex-col flex gap-4">
                          <div className="text-md text-gray-700">{c.title}</div>
                          <div className="text-md text-gray-700">{c.name}</div>
                          <div className="text-md text-gray-700">
                            {c.subTitle}
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col flex-row md:mt-4 mt-1 md:gap-5 gap-2 my-3 md:my-0">
                        <button
                          className="outline-none text-md border rounded-xl border-gray-700 px-6 py-2 block text-gray-700 font-semibold"
                          onClick={() => {
                            setEditedCat(c);
                            setCatVal(c?.name);
                            setCatImage(c?.catImage);
                            setTitle(c?.title);
                            setSubTitle(c?.subTitle);
                          }}
                        >
                          Edit
                        </button>
                        <button className="outline-none border rounded-xl border-gray-700 px-6 py-2 block text-gray-700 font-semibold">
                          <DeleteButton
                            label="Delete"
                            onDelete={() => handleDeleteCat(c._id)}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CategoriesPage;
