class MoviesController < ApplicationController
  before_action :set_movie, only: [ :show, :edit, :update, :destroy ]

  # GET /movies
  def index
    @movies = Movie.all
  end

  # GET /movies/1
  def show
  end

  # GET /movies/new
  def new
    @movie = Movie.new
  end

  # GET /movies/1/edit
  def edit
  end

  # POST /movies
  def create
    tmdb_service = TmdbService.new
    tmdb_data = tmdb_service.fetch_movie(params[:tmdb_id])

    @movie = Movie.new(
      title: tmdb_data["title"],
      description: tmdb_data["overview"],
      release_date: tmdb_data["release_date"],
      runtime: tmdb_data["runtime"]
    )

    if @movie.save
      redirect_to @movie, notice: "Movie was successfully created."
    else
      render :new
    end
  end

  # PATCH/PUT /movies/1
  def update
    if @movie.update(movie_params)
      redirect_to @movie, notice: "Movie was successfully updated."
    else
      render :edit
    end
  end

  # DELETE /movies/1
  def destroy
    @movie.destroy
    redirect_to movies_url, notice: "Movie was successfully destroyed."
  end

  # GET /movies/search
  def search
    tmdb_service = TmdbService.new
    @results = tmdb_service.search_movies(params[:query])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      @movie = Movie.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def movie_params
      params.require(:movie).permit(:title, :description, :rating, :release_date)
    end
end
