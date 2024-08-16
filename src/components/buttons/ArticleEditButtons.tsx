export default function ArticleEditButtons({ setIsEditMode }: any) {
  return (
    <div className="article-edit-buttons" style={{ display: "flex", gap: "1rem" }}>
      <button type="submit">save</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsEditMode(false);
        }}
      >
        cancel
      </button>
    </div>
  );
}
