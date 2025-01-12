<script>
import { store } from '../store';
import { useRoute } from 'vue-router';
import axios, { all } from 'axios';

import DoctorsReview from '../components/Doctors/DoctorsReview.vue';
import DoctorsMessage from '../components/Doctors/DoctorsMessage.vue';

export default {
    name: 'AppSingleDoctor',
    components: {
        DoctorsReview,
        DoctorsMessage,
    },
    data() {
        return {
            store,
            doctorData: [],
        }
    },
    methods: {
        getSingleDoctor() {
            const route = useRoute();

            axios.get(`http://127.0.0.1:8000/api/doctors/${route.params.id}`, {
            })
                .then((response) => {
                    this.doctorData = response.data.results;
                    // console.log(response.data.results); //To remove
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
    },
    created() {
        this.getSingleDoctor();
    },
}
</script>
<template>
    <div class="pt-3 pb-5">
        <div class="container">
            <div class="row g-3">
                <!-- Info Doctor -->
                <div class="col-12 col-lg-8">
                    <section id="doctor-info" class="card mb-3 p-3">
                        <div class="row">
                            <!-- Profile Pictures -->
                            <div class="col-12 col-xl-4">
                                <img v-if="doctorData.profile.picture.startsWith('placeholder')"
                                    :src="`http://127.0.0.1:8000/storage/${doctorData.profile.picture}`"
                                    :alt="doctorData.profile.picture">
                                <img v-else :src="doctorData.profile.picture">
                            </div>
                            <!-- Name and lastname -->
                            <div class="col-12 col-xl-8 ps-5 d-flex justify-content-center flex-column">
                                <h1 class="mb-2">Dott. {{ doctorData.name }} {{ doctorData.lastname }}</h1>
                                <p class="specializations">
                                    <span class="text-uppercase mb-5"
                                        v-for="specialization in doctorData.profile.specializations">{{
                                            specialization.name
                                        }} - </span>
                                </p>
                                <div class="star-review mt-2">
                                    <!-- Generate stars -->
                                    <div class="d-flex align-items-center">
                                        <div v-for="star in store.getStars(doctorData.reviews_avg_rating)" class="star"
                                            :class="(star === 0.5) ? 'half' : (star === 0) ? 'disabled' : ''"></div>
                                        <span>({{ doctorData.reviews_count }})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="separator my-5 w-50"></div>

                            <div class="col-12">
                                <!-- Contact Info -->
                                <div class="contact-info mb-5">
                                    <p class="text-uppercase">Contact info</p>
                                    <ul>
                                        <li>
                                            <i class="fa-solid fa-envelope me-3"></i>
                                            <span>{{ doctorData.email }}</span>
                                        </li>
                                        <li>
                                            <i class="fa-solid fa-phone me-3"></i>
                                            <span v-if="doctorData.profile.telephone">{{ doctorData.profile.telephone
                                            }}</span>
                                            <span v-else> - - - </span>
                                        </li>
                                        <li>
                                            <i class="fa-solid fa-location-dot me-3"></i>
                                            <span>{{ doctorData.profile.address }}</span>
                                        </li>
                                        <li>
                                            <!-- da modificare -->
                                            <a :href="`/doctor/${doctorData.id}/cv.pdf`" class="btn doc-btn">
                                                <i class="fa-solid fa-file-arrow-down me-3"></i>
                                                <span>Download CV</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Bio -->
                                <p class="box rounded-2 p-2">
                                    <div class="fw-bold mb-2">Bio:</div>
                                    <span v-if="doctorData.profile.bio">{{ doctorData.profile.bio }}</span>
                                    <span v-else> - - - </span>
                                </p>

                                <!-- Services -->
                                <p class="box rounded-2 p-2">
                                    <div class="fw-bold mb-2">My services:</div>
                                    <span v-if="doctorData.profile.services">{{ doctorData.profile.services }}</span>
                                    <span v-else> - - - </span>

                                </p>

                            </div>
                        </div>
                    </section>

                    <!-- <div class="separator my-5 w-50"></div> -->

                    <section id="review" class="card pt-4 p-3">
                        <h2 class="text-center text-uppercase mb-4">
                            <i class="fa-solid star"></i>
                            <span class="text-doctor mx-3">Reviews</span>
                            <i class="fa-solid star"></i>
                        </h2>
                        <div class="row g-3">
                            <!-- Generate Reviews -->
                            <div class="col-12" v-for="review in doctorData.reviews">

                                <div class="box rounded-2 p-2">
                                    <h4 class="mb-2">{{ review.name }} {{ review.lastname }}</h4>
                                    <pre class="fw-bold text-secondary mb-2">{{ review.email }}</pre>
                                    <!-- Generate stars -->
                                    <div class="d-flex mb-2">
                                        <div v-for="star in store.getStars(review.rating)" class="star"
                                            :class="(star === 0.5) ? 'half' : (star === 0) ? 'disabled' : ''"></div>
                                        <span>({{ review.rating / 2 }})</span>
                                    </div>
                                    <p class="m-0">
                                        {{ review.content }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Send Message or Review -->
                <div class="col-12 col-lg-4">
                    <div class="card p-5">
                        <div class="box-form">
                            <h3> Send Message</h3>
                            <DoctorsMessage />
                        </div>
                        <hr class="my-5">
                        <div class="box-form">
                            <h3>Send Review</h3>
                            <DoctorsReview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../styles/general.scss' as *;

div.box-form {
    h3 {
        margin-bottom: 1rem;
        text-align: center;
    }
}


.box{
    border: 2px solid $main-doc-color;
}

section#doctor-info {
    img {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        border: 10px solid $main-doc-color;

    }

    span {
        font-weight: 200;
    }

    div.contact-info {
        p {
            font-size: 1.5rem;
        }

        ul {
            list-style-type: none;

            li {
                font-size: 1.2rem;
                margin-bottom: .8rem;
            }
        }
    }
}
</style>