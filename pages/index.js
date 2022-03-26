import Head from "next/head";
import groq from "groq";
import { sClient } from "../lib/sanity/sClient";
import createComment from "./api/createCategory";
import { useState } from "react";

export default function Home({ categories, bookmarks }) {


  return (
    <div>

      <main className="m-10">
        <h1>Jedi Lies</h1>
        <br /><hr/>
        <h2>Input</h2>
        <form>
          <label>
            New Category: 
            <input type="text" name="name" />
          </label>
          <button className="btn">Submit</button>
        </form>
       
        <br /><hr/>
        <h2>List Categories</h2>

        {categories.length > 0 &&
          categories.map(({ _id, title = "" }) => <div key={_id}>{title}</div>)}

        <br /><hr/>
        <h2>List Bookmarks</h2>
        
        {bookmarks.length > 0 &&
          bookmarks.map(({ _id, title = "" }) => <div key={_id}>{title}</div>)}

      </main>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await sClient.fetch(groq`
    *[_type == "category"]
  `);
  const bookmarks = await sClient.fetch(groq`
    *[_type == "bookmark"]
  `);

  return {
    props: {
      categories,
      bookmarks,
    },
  };
}
