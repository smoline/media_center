require "net/http"
require "json"

class TmdbService
  BASE_URL = "https://api.themoviedb.org/3".freeze

  def initialize(api_key = ENV["TMDB_API_KEY"])
    @api_key = api_key
  end

  def search_movies(query)
    encoded_query = URI.encode_www_form_component(query)
    url = URI("#{BASE_URL}/search/movie?api_key=#{@api_key}&query=#{encoded_query}")
    response = Net::HTTP.get(url)
    JSON.parse(response)
  end

  def fetch_movie(tmdb_id)
    url = URI("#{BASE_URL}/movie/#{tmdb_id}?api_key=#{@api_key}")
    response = Net::HTTP.get(url)
    JSON.parse(response)
  end
end