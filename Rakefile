require 'jekyll/test/tasks'
task default: "jekyll:check"

require 'csv'
require 'json'
require 'net/http'

namespace :update do

  task :errors do
    `jekyll --no-auto`
    `cp _site/errors/404.html 404.html`
  end

  # Input: CSV file with columns: incode, cdc(true|false)
  task :locations, [:filename] do |task, args|
    CSV.open("_data/locations.csv", "wb") do |output|
      output << ['postcode','latitude','longitude','cdc']
      CSV.foreach(args[:filename]) do |row|
        incode = row[0]
        cdc = row[1]
        unless incode == ""
          sleep(2)
          puts incode
          uri = URI.parse("https://mapit.mysociety.org/postcode/partial/#{incode}")
          data = JSON.parse(Net::HTTP.get(uri))
          if data["wgs84_lat"] && data["wgs84_lon"]
            output << [incode, data["wgs84_lat"], data["wgs84_lon"], cdc]
          end
        end
      end
    end
  end

end

require 'rspec/core/rake_task'
RSpec::Core::RakeTask.new(:spec => :rebuild)
