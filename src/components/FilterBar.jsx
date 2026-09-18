import { Search, SlidersHorizontal } from "lucide-react";

function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  categories
}) {
  return (
    <div className="filter-bar">

      <div className="question-search">

        <Search size={18} />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
        />

      </div>


      <div className="filter-controls">

        <div className="filter-select">

          <SlidersHorizontal size={16} />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>


        <select
          className="difficulty-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="All">
            All Difficulty
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>

        </select>

      </div>

    </div>
  );
}

export default FilterBar;