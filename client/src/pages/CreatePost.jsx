import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components/exporter'

const Createpost = () => {
  //initialization of navigate hook so that the user can navigate back to homepage once the post is created
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [Loading, setLoading] = useState(false);

  const generateImage = async () => {
    //call backend
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch('https://imaginzaiserver.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        //to be able to see the image
        const data = await response.json();
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert: ('Please enter a prompt')
    }

  }

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    //checking if the prmpt and the photo exists
    if(form.prompt && form.photo){
      setLoading(true);

      try {
        //call postimg route
        const response= await fetch('http://Localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(form)
        })
        //completion of creating a post
        await response.json();
        //navigating back to home page
        navigate('/')
      } catch (err) {
        alert(err)
      } finally{
        setLoading(false);
      }
    } else{
      alert('Please enter a prompt and generate an image')
    }

  } */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://imaginzaiserver.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  }; 

  const handleChange = (e) => setform({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setform({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabeLName="Your Name Please!"
            type="text"
            name="name"
            placeholder="Ex: Shaikh Mohammed Zaid"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            LabeLName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {Loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Createpost
