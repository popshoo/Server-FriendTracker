import express from 'express';
import {v4 as uuid} from 'uuid';
import {users, friends, favorites} from './fake-database';

const app = express();
app.use(express.json());

//READ
app.get('/test', (req, res) => {
    res.send('Hello From Express!');
})

//READ List from Friends
app.get('/friends', (req, res) => {
    res.json(friends);
}) 

//READ List from favorites friends
app.get('/favorites', (req, res) => {
    res.json(favorites);
}) 

//Read from Friend by ID
app.get('/friends/:friendId', (req, res) => {
    const {friendId} = req.params;
    const friend = friends.find(friend => friend.id === friendId);

    if (friend) {
        res.json(friend);    
    } else{
         res.sendStatus(404);
    }    
});

//Detalles de el usuario por id
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);   
    }else{
        res.sendStatus(404);
    }
});

// CREATE

app.post('/friends', (req,res) => {
    const newFriendInfo = req.body;
    const newFriend = {
        ...newFriendInfo,
        id: uuid(),
    }
    friends.push(newFriend);
    res.json(friends);
});

//ADD TO FAVORITES

app.post('/favorites', (req,res) => {
    const {friendId} = req.body;
    favorites.push(friendId);
    res.json(favorites);
});

//Remove
app.delete('/friends/:friendId', (req,res) => {
    const {friendId} = req.params;
    const newFriends = friends.filter(friend => friend.id !== friendId);
    while (friends.length > 0) {
        friends.pop();
    }
    friends.push(...newFriends)
    res.json(friends);
});

//Remove To Favorites
app.delete('/favorites/:friendId', (req,res) => {
    const {friendId} = req.params;
    const newFavorites = favorites.filter(id => id !== friendId)
    while (favorites.length > 0) {
        favorites.pop();
    }
    favorites.push(...newFavorites);
    res.json(favorites);
});

//User Profile Update
app.put('/users/:userId', (req,res) => {
    const {userId} = req.params;
    const updatedUserInfo = req.body;
    let user = users.find(user => user.id === userId);
    
    if (user) {
        Object.keys(updatedUserInfo).forEach(key => {
            user[key] = updatedUserInfo[key];
        });
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

//Friend Update o Modifield
app.put('/friends/:friendId', (req,res) => {
    const {friendId} = req.params;
    const updatedFriendInfo = req.body;
    let friend = friends.find(friend => friend.id === friendId);
    
    if (friend) {
        Object.keys(updatedFriendInfo).forEach(key => {
            friend[key] = updatedFriendInfo[key];
        });
        res.json(friends);
    } else {
        res.sendStatus(404);
    }
});

app.listen(8080, () => {
    console.log('Sevidor en listo en el puerto 8080');
});