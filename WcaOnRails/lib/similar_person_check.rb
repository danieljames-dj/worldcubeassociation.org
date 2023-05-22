# frozen_string_literal: true

class SimilarPersonCheck
  def get_persons_with_same_name(name)
    Person.where(name: name)
  end

  def get_similar_persons_based_on_jaro_winkler(name, country)
    res_roman_name = self.extract_roman_name(result.person_name)

    only_probas = []
    persons_with_probas = []

    # pre-cache probabilities, so that we avoid doing string computations on _every_ comparison
    self.persons_cache.each do |p|
      p_roman_name = self.extract_roman_name(p.name)

      name_similarity = self.string_similarity(res_roman_name, p_roman_name)
      country_similarity = result.country_id == p.countryId ? 1 : 0

      only_probas.push name_similarity
      persons_with_probas.push [p, name_similarity, country_similarity]
    end

    proba_threshold = only_probas.sort { |a, b| b <=> a }.take(2 * n).last
    sorting_candidates = persons_with_probas.filter { |_, np, _| np >= proba_threshold }

    # `sort_by` is _sinfully_ expensive, so we try to reduce the amount of comparisons as much as possible.
    sorting_candidates.sort_by { |p, np, cp| [-np, -cp, p.wca_id.present?] }
                      .take(n)
  end

  def self.extract_roman_name(person_name)
    # We store names in our database as "Romanized Name (Local Name)"
    #   so the regex captures the first group as romanized name,
    #   then the actual brackets (which have to be \ masked)
    #   and then the local name within those brackets
    name_matches = person_name.match(/(.*)\((.*)\)$/)
    name_matches ? name_matches[0] : person_name
  end

  def self.persons_cache
    @persons_cache ||= Person.select(:id, :wca_id, :name, :year, :month, :day, :countryId)
  end
end
