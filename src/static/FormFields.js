export const formFieldsStep1 = [
  { name: "name", label: "Title", placeholder: "Enter video title" },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter video description",
    type: "textarea",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select category",
    type: "select",
    options: [
      "Music",
      "Movie",
      "Live",
      "Gaming",
      "News",
      "Sports",
      "Learning",
      "Fashion & Beauty",
    ],
  },
  {
    name: "link",
    label: "Video link",
    placeholder:
      'Example: "https://www.youtube.com/watch?v=vA86QFrXoho" then "vA86QFrXoho"',
  },
  {
    name: "thumbnail",
    label: "Thumbnail",
    placeholder: "Enter thumbnail URL",
  },
];

export const formFieldsStep2 = [
  {
    name: "channel",
    label: "Channel Name",
    placeholder: "Enter channel name",
  },
  { name: "logo", label: "Logo", placeholder: "Enter logo URL" },
  {
    name: "subscribers",
    label: "Subscribers",
    placeholder: "Example: 12M",
  },
  {
    name: "duration",
    label: "Duration",
    placeholder: "Example: 05:36",
  },
  {
    name: "uploadTime",
    label: "Upload Time",
    placeholder: "Example: 2 months ago",
  },
  { name: "views", label: "Views", placeholder: "Example: 125K" },
];
