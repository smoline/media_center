class Movie < ApplicationRecord
  validates :title, presence: true
  validates :director, presence: true
  validates :release_year, presence: true, numericality: { only_integer: true }

  def self.released_after(year)
    where("release_year > ?", year)
  end
end
