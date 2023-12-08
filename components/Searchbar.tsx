"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";


const isValidAmazonProductURL=(url:string)=>{
    try {
        const parsedURL = new URL(url);
        const hostname=parsedURL.hostname;
        if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.includes('amazon')){
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink=isValidAmazonProductURL(searchPrompt);

    if(!isValidLink) {
        alert('Please provide a valid amazon link');
        return;
    }

    try {
        setLoading(true);
        const product=await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
        console.log(error);
    }finally{
        setLoading(false);

    }
    
  };
  return (
    <form className="flex flex-wrap gap-4 mt-16" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
      />
      <button type="submit" className="searchbar-btn" disabled={searchPrompt===''}>
        {loading?'Searchin...':'Search'}
      </button>
    </form>
  );
};

export default Searchbar;
