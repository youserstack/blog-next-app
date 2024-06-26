import "./CategoryDeleteButton.scss";

export default function CategoryDeleteButton({ setCurrentModal }: any) {
  const handleClickDeleteButton = () => setCurrentModal("category-delete-modal");

  return (
    <button className="category-delete-button" onClick={handleClickDeleteButton}>
      delete this category
    </button>
  );
}
