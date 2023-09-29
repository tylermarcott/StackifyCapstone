<template>
    <section class="bg-dark-grey">
        <div class="p-5 pb-0 d-flex justify-content-center align-items-center">
            <img class="img-fluid" src="https://live.staticflickr.com/4119/4830613898_c064479b2a_n.jpg" alt="">
        </div>
        <div class="card bg-dark-grey text-white elevation-5 mt-5">
            <p class="card-header bg-pink song-title text-center my-2">Track Details: The Good Left Undone</p>
            <div class="card-body text-pink song-details-card row justify-content-evenly my-3">
                <div class="col-12 col-md-5">
                    <p>Artist: Rise Against</p>
                    <p>Album: The Sufferer & The Witness</p>
                    <p>Year: 2006</p>
                    <p>Key: C# Minor</p>
                    <p>Duration: 3:01 </p>
                </div>
                <div class="col-12 col-md-5">
                    <p>Valence: 52</p>
                    <p>Dance-ability: 18</p>
                    <p>BPM: 197</p>
                    <p>Popularity: 60</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>


<style lang="scss" scoped>
.album-cover {
    height: 50%;
    width: 50%;
    object-fit: contain;
    object-position: center;
}

.bg-dark-grey {
    background-color: #4f4f4f;
}

.bg-pink {
    background-color: #e1289F;
}

.text-white {
    color: #eeeeee
}

.text-pink {
    color: #e1289F
}

.song-title {
    font-size: 2rem;
    font-weight: 700;
}

.song-details-card {
    margin-left: 8vw;
    margin-bottom: 5vh;
    text-decoration: none;
    color: #E1289F;
    font-size: 1.75rem;
}
</style>