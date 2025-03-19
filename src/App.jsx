
import { useState } from 'react'
import './App.css'

function App() {
  
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState('');
  const [recipeDetail, setRecipeDetail] = useState('');
  const [showRecipe, setShowRecipe] = useState(null);

  const addRecipe = (e) => {
    e.preventDefault();
    if(!newRecipe.trim())return;
    setRecipes([...recipes, {id: Date.now() , name: newRecipe, details: recipeDetail}]);
    setNewRecipe('');
    setRecipeDetail('');
  };

  return (
    <div className='container'>
     <h1>料理レシピ共有アプリ</h1>
     <form onSubmit={addRecipe}>
      <input 
          value={newRecipe}
          type="text" 
          className='recipe-input' 
          placeholder='レシピを入力してください' 
          onChange={(e) => setNewRecipe(e.target.value)} />
      <textarea 
          className='recipe-detail-input' 
          value={recipeDetail}
          placeholder='レシピの詳細を入力してください' 
          onChange={(e) => setRecipeDetail(e.target.value)}
      ></textarea>
      <button type='submit' className='add-botton'>レシピを追加</button>
     </form>

     <ul className='recipe-list'>
      {recipes.map((recipe) => (
         // onClickハンドラーで、クリックしたレシピが現在表示中の場合は非表示に、そうでなければ表示するようにする
        <li key={recipe.id} className='recipe-item' onClick={() => setShowRecipe(recipe.id === showRecipe ? null : recipe.id)}>
          {recipe.name}
        </li>
      ))}
     </ul>
     {showRecipe && (
       //recipes配列からshowRecipeと一致するIDのレシピを探し、存在すればそのdetailsを表示。
       //存在しない場合は「詳細がありません」というメッセージを表示する。
      <p className='recipe-details'>
        {recipes.find(recipe => recipe.id === showRecipe )?.details || '詳細がありません'}
      </p>
     )}
   
     <div className='recipe-count'>レシピ総数 : {recipes.length}</div>
    
    </div>
  )
}

export default App
