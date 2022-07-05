# Códigos para uso futuro

## Juntar objetos com items com valores repetidos de um array

```javascript
let postAndCateAndComments = [];
      
      for (var i = 0; i < posts.length; i++) {
          var category_idIgual = false;
          for (var j = 0; j < i; j++) {
              if (postAndCateAndComments[j] && posts[i].id == postAndCateAndComments[j].id) {
                if(posts[i].category_id) postAndCateAndComments[j].categories.push({
                      category_id: posts[i].category_id,
                      category_name: posts[i].category_name
                  })
                  if(posts[i].comment_id)  postAndCateAndComments[j].comments.push({
                    comment_id: posts[i].comment_id,
                    comment_title: posts[i].comment_title
                })
                  category_idIgual = true;
                  break;
              }
          }
          
          if (!category_idIgual) {
              postAndCateAndComments.push({
                  id: posts[i].id,
                  title: posts[i].title,
                  content: posts[i].content,
                  categories: [],
                  comments: []
              })
          }
      }

```