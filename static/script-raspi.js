
setTimeout(mudar, 8000)

function mudar()
{
    fetch(`http://127.0.0.1:5000/pingpong`)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.status);
                            document.location.href="http://127.0.0.1:5000/offline"
                            return
                        }
                        document.location.href='http://127.0.0.1:5000/media'
                    })
}