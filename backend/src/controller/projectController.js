const axios = require('axios');

exports.index = async (req, res) => {
    return res.send(await axios.get(`https://api.github.com/users/dcerverizzo`)
        .then((res) => {
            return profile = {
                name: res.data.name,
                bio: res.data.bio,
                avatar: res.data.avatar_url,
                followers: res.data.followers
            };
        }).catch(err => console.error(err)));
};

exports.view = async function view(req, res) {
    let projects = [];
    return res.send(await axios.get(`https://api.github.com/users/dcerverizzo/repos`)
        .then((res) => {
            res.data.forEach((element, index) => {

                var date = new Date(element.pushed_at);
                var day = date.getDate().toString().padStart(2, '0')
                var month = (date.getMonth() + 1).toString().padStart(2, '0')
                var year = date.getFullYear().toString().padStart(4, '0')
                var year = `${month}/${day}/${year}`;

                projects[index] =
                    [
                        id = index,
                        full_name = element.name,
                        url = element.html_url,
                        last_commit = year
                    ];
            });
            return projects;
        }).catch(err => console.error(err)));
};

