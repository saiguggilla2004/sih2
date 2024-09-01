const mongoose=require("mongoose");
const Alumni=require("./models/alumni.js");
const Story=require("./models/successStories");
const Job = require("./models/job.js")
main()
.then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})
async function main()
{
  await mongoose.connect("mongodb://127.0.0.1:27017/sih");
}

const sampleAlumni = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      graduationYear: 2020,
      fieldOfStudy: "Computer Science",
      industry: "Software Development",
      location: "San Francisco, CA",
      profilePicture: "path/to/john_doe_picture.jpg",
      bio: "Software engineer with 4 years of experience in web development.",
      dateJoined: new Date("2024-01-15T09:00:00Z")
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      graduationYear: 2019,
      fieldOfStudy: "Electrical Engineering",
      industry: "Hardware Design",
      location: "New York, NY",
      profilePicture: "path/to/jane_smith_picture.jpg",
      bio: "Electrical engineer specializing in consumer electronics.",
      dateJoined: new Date("2024-02-20T09:00:00Z")
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@example.com",
      graduationYear: 2021,
      fieldOfStudy: "Business Administration",
      industry: "Finance",
      location: "Chicago, IL",
      profilePicture: "path/to/emily_johnson_picture.jpg",
      bio: "Financial analyst with a focus on investment strategies.",
      dateJoined: new Date("2024-03-10T09:00:00Z")
    },
    {
      firstName: "Michael",
      lastName: "Williams",
      email: "michael.williams@example.com",
      graduationYear: 2018,
      fieldOfStudy: "Mechanical Engineering",
      industry: "Automotive",
      location: "Detroit, MI",
      profilePicture: "path/to/michael_williams_picture.jpg",
      bio: "Mechanical engineer working on advanced vehicle systems.",
      dateJoined: new Date("2024-04-25T09:00:00Z")
    },
    {
      firstName: "Olivia",
      lastName: "Brown",
      email: "olivia.brown@example.com",
      graduationYear: 2022,
      fieldOfStudy: "Graphic Design",
      industry: "Creative Arts",
      location: "Los Angeles, CA",
      profilePicture: "path/to/olivia_brown_picture.jpg",
      bio: "Graphic designer with expertise in branding and visual storytelling.",
      dateJoined: new Date("2024-05-30T09:00:00Z")
    }
  ];

  // Alumni.insertMany(sampleAlumni)
  // .then((res)=>{
  //   console.log("inserted succesfuly");
  //   console.log(res);
  // })
  // .catch((err)=>{
  //   console.log(err);
  // })

  // const successStories = [
  //   {
  //     alumniId: "60f5b2d8b6b6c5e9a4b2a1b4", // Replace with actual Alumni ObjectId
  //     title: "Innovative Tech Startup Founder",
  //     content: "John Doe, class of 2010, founded an innovative tech startup that recently received a $10 million investment. His company is now a leading player in the AI space.",
  //     publishedAt: new Date("2024-01-15T09:00:00Z"),
  //     isFeatured: true
  //   },
  //   {
  //     alumniId: "60f5b2d8b6b6c5e9a4b2a1b5", // Replace with actual Alumni ObjectId
  //     title: "Award-Winning Educator",
  //     content: "Jane Smith, class of 2008, was awarded the National Teacher of the Year for her groundbreaking work in education and innovative teaching methods.",
  //     publishedAt: new Date("2024-02-20T09:00:00Z"),
  //     isFeatured: false
  //   },
  //   {
  //     alumniId: "60f5b2d8b6b6c5e9a4b2a1b6", // Replace with actual Alumni ObjectId
  //     title: "Healthcare Innovator",
  //     content: "Michael Johnson, class of 2012, developed a new healthcare technology that has improved patient outcomes significantly. His work has been recognized by several healthcare organizations.",
  //     publishedAt: new Date("2024-03-05T09:00:00Z"),
  //     isFeatured: true
  //   },
  //   {
  //     alumniId: "60f5b2d8b6b6c5e9a4b2a1b7", // Replace with actual Alumni ObjectId
  //     title: "Successful Entrepreneur in Finance",
  //     content: "Emily Davis, class of 2015, launched a successful financial consultancy firm that helps small businesses navigate complex financial regulations. Her firm has been praised for its innovative solutions.",
  //     publishedAt: new Date("2024-04-10T09:00:00Z"),
  //     isFeatured: false
  //   },
  //   {
  //     alumniId: "60f5b2d8b6b6c5e9a4b2a1b8", // Replace with actual Alumni ObjectId
  //     title: "Top-Ranked Research Scientist",
  //     content: "Chris Brown, class of 2013, is a leading researcher in environmental science. His recent paper on climate change has been published in several prestigious journals, contributing significantly to the field.",
  //     publishedAt: new Date("2024-05-25T09:00:00Z"),
  //     isFeatured: true
  //   }
  // ];

  const sampleJobs = [
    {
      userId: "6234567890abcdef12345678",
      title: "Software Engineer",
      description: "We are looking for a skilled software engineer to join our team.",
      location: "New York",
      experience: "3-5 years"
    },
    {
      userId: "6234567890abcdef12345679",
      title: "Data Scientist",
      description: "We are seeking a data scientist to analyze and interpret complex data.",
      location: "San Francisco",
      experience: "5-7 years"
    },
    {
      userId: "6234567890abcdef12345680",
      title: "DevOps Engineer",
      description: "We need a DevOps engineer to ensure the smooth operation of our systems.",
      location: "London",
      experience: "2-4 years"
    },
    {
      userId: "6234567890abcdef12345681",
      title: "Full Stack Developer",
      description: "We are looking for a full stack developer to work on our web application.",
      location: "Paris",
      experience: "1-3 years"
    },
    {
      userId: "6234567890abcdef12345682",
      title: "UX Designer",
      description: "We need a UX designer to create user-friendly interfaces.",
      location: "Tokyo",
      experience: "2-5 years"
    }
  ];
  
  Job.insertMany(sampleJobs)
  .then((res)=>{
    console.log(res);
  })
  .catch((err)=>{
    console.log(err);
  })
