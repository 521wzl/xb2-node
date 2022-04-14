export const sqlFragment = {
    user: ` 
        JSON_OBJECT(
        'id', user.id,
        'name', user.name
        )as user `,
    leftJoinUser: `
        LEFT JOIN user
        ON post.userId = user.id
    `,
    TotalComments: `
        (SELECT
            COUNT(comment.id)
            FROM comment
            WHERE post.id = comment.postId
            )AS totalComments
       
       

    `,
    leftJoinComment: `
        LEFT JOIN comment
        ON post.id = comment.postId
      
    
    `,
    file: `
    CAST(
        IF (COUNT(file.id),
        CONCAT('[',
        GROUP_CONCAT(DISTINCT JSON_OBJECT('id',file.id , 'width',file.width, 'height',file.height)), 
        ']'),
        NULL)
        AS JSON )AS file
        `,
    leftJoinOneFile:`
    LEFT JOIN LATERAL(
        SELECT *
        FROM file
        WHERE post.id = file.postId
        ORDER BY file.id DESC
        LIMIT 1
    )AS file
    ON post.id = file.postId
    LEFT JOIN comment
    ON post.id= comment.postId

    `,
    tags:`
    CAST(
    
    IF(COUNT(tag.id),
    CONCAT('[',
    GROUP_CONCAT(DISTINCT JSON_OBJECT('id',tag.id,'name',tag.name)
    ),
    ']'),
    null)
    
    AS JSON)AS tags

    `,
    leftJoinTag:`
    LEFT JOIN post_tag
    ON post.id = post_tag.postId
    LEFT JOIN tag
    ON post_tag.tagId = tag.id
    
    `,
}