using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TC.API.Model;

namespace TC.API.Controllers
{
    [Route("string-operation")]
    [ApiController]
    public class StringOperationController : ControllerBase
    {
        private readonly ILogger<StringOperationController> _logger;
        public StringOperationController(ILogger<StringOperationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("search")]
        public IEnumerable<SearchResult> Search(string text, string subText)
        {
            int subTextLength = subText.Length;
            int occurence = 1;
            List<SearchResult> searchResults = new List<SearchResult>();
            subText = subText.ToLower();
            for (int index = 0; index <= text.Length - subTextLength; index++)
            { 
                if (text.Substring(index, subTextLength).ToLower() == subText)
                {
                    searchResults.Add(new SearchResult() { Occurence = occurence++, SearchIndex = index + 1 });
                }
            } 
            return searchResults; 
        } 
    }
}