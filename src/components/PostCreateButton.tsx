"use client";

export default function PostCreateButton() {
  const handleOpenModal = () => {
    const element = document.querySelector("html body .post-create-modal") as HTMLElement;
    element.style.display = "block";
  };

  return <button onClick={handleOpenModal}>create a post</button>;
}
